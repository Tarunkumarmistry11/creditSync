const { parseStringPromise } = require('xml2js');

const parseXML = async (xmlData) => {
  try {
    const result = await parseStringPromise(xmlData, { explicitArray: false });
    const report = result.CreditReport; // Adjust based on actual XML structure

    // Check if the expected keys exist in the XML data
    if (!report) {
      throw new Error('Invalid XML structure: CreditReport not found');
    }

    return {
      name: report.Name || 'N/A',
      mobile: report.MobilePhone || 'N/A',
      pan: report.PAN || 'N/A',
      creditScore: report.CreditScore || 'N/A',
      reportSummary: {
        totalAccounts: report.Summary?.TotalAccounts || 0,
        activeAccounts: report.Summary?.ActiveAccounts || 0,
        closedAccounts: report.Summary?.ClosedAccounts || 0,
        currentBalance: report.Summary?.CurrentBalance || 0,
        securedAmount: report.Summary?.SecuredAmount || 0,
        unsecuredAmount: report.Summary?.UnsecuredAmount || 0,
        last7DaysInquiries: report.Summary?.Last7DaysInquiries || 0,
      },
      creditAccounts: report.Accounts ? report.Accounts.map(account => ({
        creditCardBank: account.Bank || 'N/A',
        accountNumber: account.AccountNumber || 'N/A',
        amountOverdue: account.AmountOverdue || 0,
        currentBalance: account.CurrentBalance || 0,
      })) : [],
    };
  } catch (error) {
    throw new Error(`Failed to parse XML: ${error.message}`);
  }
};

module.exports = { parseXML };
