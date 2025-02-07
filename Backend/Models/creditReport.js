const mongoose = require('mongoose');
const creditReportSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  pan: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysInquiries: Number,
  },
  creditAccounts: [{
    creditCardBank: String,
    accountNumber: String,
    amountOverdue: Number,
    currentBalance: Number,
  }]
}, { timestamps: true });

const CreditReport = mongoose.model('CreditReport', creditReportSchema);
module.exports =  CreditReport;
