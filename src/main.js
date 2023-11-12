/**
 * Gmail Deletion Tool
 * @see https://github.com/KzclassLLC/GmailDeletionTool#gmail-deletion-tool
 *
 * MIT License
 * @copyright 2023 Kz class LLC
 */

/**
 * Gmail deletion process
 * Deletes the target email based on the label
 */
function deleteMails() {
  // Get user labels
  const labels = GmailApp.getUserLabels();

  // Total number of deleted emails
  let count = 0;

  // Perform deletion process for each label name
  for (const label of labels) {
    count = deleteMailByLabel_(label.getName(), count);

    // If the deletion limit is reached, the process is terminated
    if (count >= LIMIT_DELETE_MAIL) {
      break;
    }
  }

  logAndToast_(MESSAGE_TABLE[lang].deleteMails.toast + count);
}

/**
 * Get and delete mail with specific label in gmail
 * If the label is nested, the parent label will not respond, and only the child label will be the target of this function.
 * If multiple labels are attached to the target mail, the stricter one will be deleted.
 *
 * @param {string} labelName Label name. There should be the number of days to delete after @.
 * @param {number} count Total number of deleted emails
 * @return {number} Total number of deleted emails
 */
function deleteMailByLabel_(labelName, count) {
  // Create search condition
  const condition = makeSearchCondition_(labelName);

  // If the search condition is null, the process is terminated
  if (condition === null) {
    return count;
  }

  // The total number of emails to be deleted is limited to LIMIT_DELETE_MAIL to prevent timeout
  const threads = GmailApp.search(condition, 0, LIMIT_DELETE_MAIL - count);

  logAndToast_(
    labelName +
      '\n' +
      MESSAGE_TABLE[lang].deleteMailByLabel.toast +
      threads.length
  );

  count += threads.length;

  // Delete all threads obtained by search
  GmailApp.moveThreadsToTrash(threads);

  return count;
}

/**
 * Create search condition
 * Returns null if the label name does not meet the search criteria.
 *
 * @param {string} labelName Label name. There should be the number of days to delete after @.
 * @return {string|null} Search condition string if valid, null otherwise
 */
function makeSearchCondition_(labelName) {
  const labelInfo = checkLabelNameValidity_(labelName);

  if (labelInfo === null) {
    return null;
  }

  // If the label name is not in the CATEGORY_TABLE, it is a user label
  // CATEGORY_TABLE has labels under the category label, such as Social, New, Promotion, and Forum, without @
  const categoryLabelTable = CATEGORY_TABLE;
  if (!categoryLabelTable[labelInfo.name]) {
    categoryLabelTable[labelInfo.name] = 'label: ' + labelName;
  }

  const condition =
    categoryLabelTable[labelInfo.name] +
    ' older_than:' +
    labelInfo.days +
    'd -is:starred ';

  console.log('search condition:' + condition);

  return condition;
}

/**
 * Check the validity of the label name
 * Returns null if the label name does not meet the criteria.
 *
 * @param {string} labelName Label name. There should be the number of days to delete after @.
 * @return {object|null} labelInfo An object containing the name and days if valid, null otherwise
 * @property {string} labelInfo.name Label name
 * @property {number} labelInfo.days Number of days to delete
 */
function checkLabelNameValidity_(labelName) {
  const labelNameArray = labelName.split('@');

  // If the label name does not contain @, it is not a target
  if (labelNameArray.length === 1) {
    logAndToast_(
      labelName + '\n' + MESSAGE_TABLE[lang].checkLabelNameValidity.noAt
    );
    return null;
  }

  const days = labelNameArray[labelNameArray.length - 1];

  // If the number of days to delete is not a positive integer, it is not a target
  if (!Number.isInteger(Number(days)) || Number(days) <= 0) {
    logAndToast_(
      labelName + '\n' + MESSAGE_TABLE[lang].checkLabelNameValidity.noInteger
    );
    return null;
  }

  // Remove the number of days from the label name
  labelNameArray.pop();
  const name = labelNameArray.join('@');

  return { name: name, days: days };
}

/**
 * Log and toast
 *
 * @param {string} str String to log and toast
 */
function logAndToast_(str) {
  console.log(str);
  SpreadsheetApp.getActiveSpreadsheet().toast(str);
}
