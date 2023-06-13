const { Telegraf } = require("telegraf");
const currency = require("./api");

const bot = new Telegraf("6250912533:AAGjPWIeTbGTu2oMjqqVJrCRZRYCMMA_lnc");

bot.start((ctx) => {
  const firstname = ctx.chat.first_name;
  const username = ctx.chat.username;
  ctx.replyWithHTML(
    `Hi ${firstname}, Welcome to our bot\nYou can know about currency with this bot\n/currency - for currency converting\n/extensions - for getting extension code\nTo contact with admin - <a href="https://t.me/onlaynmiz">Admin</a>`
  );
});

bot.command("extensions", (ctx) => {
  ctx.reply("Hi there there is all countries with currency extensions");
  ctx.replyWithHTML(`
  Afghanistan - AFN
Albania - ALL
Algeria - DZD
Andorra - EUR
Angola - AOA
Antigua and Barbuda - XCD
Argentina - ARS
Armenia - AMD
Australia - AUD
Austria - EUR
Azerbaijan - AZN
Bahamas - BSD
Bahrain - BHD
Bangladesh - BDT
Barbados - BBD
Belarus - BYN
Belgium - EUR
Belize - BZD
Benin - XOF
Bhutan - BTN
Bolivia - BOB
Bosnia and Herzegovina - BAM
Botswana - BWP
Brazil - BRL
Brunei - BND
Bulgaria - BGN
Burkina Faso - XOF
Burundi - BIF
Cabo Verde - CVE
Cambodia - KHR
Cameroon - XAF
Canada - CAD
Central African Republic - XAF
Chad - XAF
Chile - CLP
China - CNY
Colombia - COP
Comoros - KMF
Congo - XAF
Costa Rica - CRC
Croatia - HRK
Cuba - CUP
Cyprus - EUR
Czech Republic - CZK
Denmark - DKK
Djibouti - DJF
Dominica - XCD
Dominican Republic - DOP
East Timor - USD
Ecuador - USD
Egypt - EGP
El Salvador - USD
Equatorial Guinea - XAF
Eritrea - ERN
Estonia - EUR
Eswatini - SZL
Ethiopia - ETB
Fiji - FJD
Finland - EUR
France - EUR
Gabon - XAF
Gambia - GMD
Georgia - GEL
Germany - EUR
Ghana - GHS
Greece - EUR
Grenada - XCD
Guatemala - GTQ
Guinea - GNF
Guinea-Bissau - XOF
Guyana - GYD
Haiti - HTG
Honduras - HNL
Hong Kong - HKD
Hungary - HUF
Iceland - ISK
India - INR
Indonesia - IDR
Iran - IRR
Iraq - IQD
Ireland - EUR
Israel - ILS
Italy - EUR
Jamaica - JMD
Japan - JPY
Jordan - JOD
Kazakhstan - KZT
Kenya - KES
Kiribati - AUD
Korea, North - KPW
Korea, South - KRW
Kuwait - KWD
Kyrgyzstan - KGS
Laos - LAK
Latvia - EUR
Lebanon - LBP
Lesotho - LSL
Liberia - LRD
Libya - LYD
Liechtenstein - CHF
Lithuania - EUR
Luxembourg - EUR
Madagascar - MGA
Malawi - MWK
Malaysia - MYR
Maldives - MVR
Mali - XOF
Malta - EUR
Marshall Islands - USD
Mauritania - MRU
Mauritius - MUR
Mexico - MXN
Micronesia - USD
Moldova - MDL
Monaco - EUR
Mongolia - MNT
Montenegro - EUR
Morocco - MAD
Mozambique - MZN
Myanmar - MMK
Namibia - NAD
Nauru - AUD
Nepal - NPR
Netherlands - EUR
New Zealand - NZD
Nicaragua - NIO
Niger - XOF
Nigeria - NGN
North Macedonia - MKD
Norway - NOK
Oman - OMR
Pakistan - PKR
Palau - USD
Panama - PAB
Papua New Guinea - PGK
Paraguay - PYG
Peru - PEN
Philippines - PHP
Poland - PLN
Portugal - EUR
Qatar - QAR
Romania - RON
Russia - RUB
Rwanda - RWF
Saint Kitts and Nevis - XCD
Saint Lucia - XCD
Saint Vincent and the Grenadines - XCD
Samoa - WST
San Marino - EUR
Sao Tome and Principe - STN
Saudi Arabia - SAR
Senegal - XOF
Serbia - RSD
Seychelles - SCR
Sierra Leone - SLL
Singapore - SGD
Slovakia - EUR
Slovenia - EUR
Solomon Islands - SBD
Somalia - SOS
South Africa - ZAR
South Sudan - SSP
Spain - EUR
Sri Lanka - LKR
Sudan - SDG
Suriname - SRD
Sweden - SEK
Switzerland - CHF
Syria - SYP
Taiwan - TWD
Tajikistan - TJS
Tanzania - TZS
Thailand - THB
Togo - XOF
Tonga - TOP
Trinidad and Tobago - TTD
Tunisia - TND
Turkey - TRY
Turkmenistan - TMT
Tuvalu - AUD
Uganda - UGX
Ukraine - UAH
United Arab Emirates - AED
United Kingdom - GBP
United States - USD
Uruguay - UYU
Uzbekistan - UZS
Vanuatu - VUV
Vatican City - EUR
Venezuela - VES
Vietnam - VND
Yemen - YER
Zambia - ZMW
Zimbabwe - ZWL
  `);
});

const messages = {};

bot.command("currency", (ctx) => {
  ctx.reply(
    "Wonderful, Please type the currency that you have\nWarning: You should type only extensions\n/extensions - for getting extension code"
  );
  messages[ctx.chat.id] = { step: 1 };
});

bot.on("message", async (ctx) => {
  const chatId = ctx.chat.id;
  const message = ctx.message.text;

  if (messages[chatId] && messages[chatId].step === 1) {
    messages[chatId].currencyHave = message;
    ctx.reply("So, type the currency that you want");
    messages[chatId].step = 2;
  } else if (messages[chatId] && messages[chatId].step === 2) {
    messages[chatId].currencyWant = message;
    ctx.reply("Please enter the amount");
    messages[chatId].step = 3;
  } else if (messages[chatId] && messages[chatId].step === 3) {
    messages[chatId].amount = message;
    ctx.reply("Please wait ...");
    try {
      const reply = await currency(
        messages[chatId].currencyHave,
        messages[chatId].currencyWant,
        messages[chatId].amount
      );

      ctx.reply(
        `${reply.old_amount} ${reply.old_currency} is equal to ${reply.new_amount} ${reply.new_currency}`
      );
    } catch (error) {
      ctx.reply("An error occurred while processing the currency conversion.");
    }

    delete messages[chatId];
  }
});

bot.launch().then();
