module.exports = {
  MID: process.env.MID,
  PAYTM_MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY,
  PAYTM_FINAL_URL: 'https://securegw-stage.paytm.in/theia/processTransaction',
  WEBSITE: process.env.WEBSITE,
  CHANNEL_ID: 'WEB',
  INDUSTRY_TYPE_ID: 'FOOD',
  CALLBACK_URL: 'http://localhost:8900/paywithpaytmresponse'
};
