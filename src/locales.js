export const translations = {
  en: {
    brand: "Edge Terminal",
    nav: {
      dashboard: "Congress Trades",
      insider: "Insider Trades",
      options: "Options Flow",
      earnings: "Earnings",
      charts: "Market Charts",
      macro: "Macro Data"
    },
    dashboard: {
      title: "Congress Trading Tracker",
      subtitle: "Real-time tracking of U.S. Congress members' stock transactions. Click a trade to view entry point.",
      loading: "Loading data...",
      selectPrompt: "Select a trade to view chart",
      table: {
        politician: "Politician",
        ticker: "Ticker",
        transaction: "Transaction",
        date: "Date",
        amount: "Amount"
      }
    },
    insider: {
      title: "Corporate Insider Tracker",
      subtitle: "Tracking Form 4 filings by CEOs, CFOs, and Directors buying/selling their own company stock.",
      loading: "Loading insider data...",
      selectPrompt: "Select an insider trade to view chart",
      table: {
        insider: "Insider",
        role: "Role",
        ticker: "Ticker",
        transaction: "Transaction",
        date: "Date",
        amount: "Amount ($)"
      }
    },
    options: {
      title: "Options Flow & Dark Pool",
      subtitle: "Unusual options activity, sweeping sweeps, and institutional dark pool block trades.",
      loading: "Scanning for unusual flow...",
      table: {
        time: "Time",
        ticker: "Ticker",
        type: "Type",
        strikeExp: "Strike / Exp",
        premium: "Premium ($)",
        details: "Details"
      }
    },
    earnings: {
      title: "Earnings Calendar",
      subtitle: "Upcoming earnings reports for major tech and market-moving companies.",
      table: {
        company: "Company",
        ticker: "Ticker",
        date: "Date",
        estEPS: "Est. EPS",
        prevEPS: "Prev EPS",
        status: "Status"
      }
    },
    charts: {
      title: "Market Charts",
      subtitle: "Interactive candlestick charts. Search any ticker globally. (5-Year Data)",
      searchPlaceholder: "Search any ticker (e.g., TSLA, ^GSPC, TSM)...",
      loadButton: "Load",
      loading: "Loading chart data...",
      failedToLoad: "Failed to load chart for"
    },
    macro: {
      title: "Macroeconomic Data",
      subtitle: "Latest economic indicators and monetary policy data.",
      from: "from",
      nextRelease: "Next Release:",
      table: {
        indicator: "Indicator",
        actual: "Actual",
        forecast: "Forecast",
        previous: "Previous",
        date: "Date",
        impact: "Impact"
      }
    }
  },
  zh: {
    brand: "Edge 終端機",
    nav: {
      dashboard: "國會持倉",
      insider: "內部交易",
      options: "選擇權暗池",
      earnings: "財報行事曆",
      charts: "市場線圖",
      macro: "宏觀數據"
    },
    dashboard: {
      title: "國會議員交易追蹤",
      subtitle: "即時追蹤美國國會議員股票交易。點擊交易紀錄可查看開倉點位。",
      loading: "載入資料中...",
      selectPrompt: "請選擇一筆交易以檢視圖表",
      table: {
        politician: "政治人物",
        ticker: "股票代碼",
        transaction: "交易方向",
        date: "日期",
        amount: "金額"
      }
    },
    insider: {
      title: "企業內部交易追蹤",
      subtitle: "追蹤執行長、財務長與董事買賣自家公司股票的紀錄（Form 4）。",
      loading: "載入內部交易資料中...",
      selectPrompt: "請選擇一筆交易以檢視圖表",
      table: {
        insider: "內部人士",
        role: "職位",
        ticker: "股票代碼",
        transaction: "交易方向",
        date: "日期",
        amount: "金額 ($)"
      }
    },
    options: {
      title: "選擇權大單與暗池",
      subtitle: "追蹤市場異常選擇權大單 (Sweeps) 與機構暗池 (Dark Pool) 鉅額交易。",
      loading: "掃描市場異常大單中...",
      table: {
        time: "時間",
        ticker: "股票代碼",
        type: "類型",
        strikeExp: "履約價 / 到期日",
        premium: "權利金 ($)",
        details: "詳細資訊"
      }
    },
    earnings: {
      title: "財報行事曆",
      subtitle: "即將發布財報的科技巨頭與市場焦點公司預期。",
      table: {
        company: "公司名稱",
        ticker: "股票代碼",
        date: "日期",
        estEPS: "預估 EPS",
        prevEPS: "前期 EPS",
        status: "狀態"
      }
    },
    charts: {
      title: "市場線圖",
      subtitle: "互動式 K 線圖。可搜尋全球所有股票代碼。(5年期資料)",
      searchPlaceholder: "搜尋任何股票代碼 (如 TSLA, ^GSPC)...",
      loadButton: "載入",
      loading: "載入圖表資料中...",
      failedToLoad: "無法載入圖表："
    },
    macro: {
      title: "宏觀經濟數據",
      subtitle: "最新的經濟指標與貨幣政策數據。",
      from: "前值",
      nextRelease: "下次發布時間：",
      table: {
        indicator: "經濟指標",
        actual: "實際值",
        forecast: "預測值",
        previous: "前值",
        date: "日期",
        impact: "影響程度"
      }
    }
  }
};
