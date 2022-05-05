const app = {
  data() {
    return {
      selectInstallment: {},
      checkbox: false,
      miniSideBar: false,
      step: 1,
      stepTitle: "STEP1. 選擇付款方式",
      creditNum: "",
      creditNum2: "",
      creditNum3: "",
      creditNum4: "",
      payment: {},
      payData: [
        {
          imgUrl: "img/credit-card.svg",
          name: "信用卡/金融卡",
        },
        {
          imgUrl: "img/unionpay.svg",
          name: "銀聯卡",
        },
        {
          imgUrl: "img/shop.svg",
          name: "超商付款",
        },
        {
          imgUrl: "img/web-atm.svg",
          name: "Web ATM",
        },
        {
          imgUrl: "img/atm.svg",
          name: "ATM轉帳",
        },
      ],
      installment: [
        {
          name: "一次付款",
        },
        {
          name: "分期付款",
        },
      ],
      shopData: [
        {
          title: "付款超商：",
          value: "",
        },
        {
          title: "付款代碼：",
          value: "",
        },
        {
          title: "付款期限：",
          value: "",
        },
      ],
      atmData: [
        {
          title: "付款銀行：",
          value: "",
        },
        {
          title: "匯款帳號(郵局700)：",
          value: "0000000-0000000",
        },
        {
          title: "付款期限：",
          value: "",
        },
      ],
    };
  },
  watch: {
    // 監聽step：切換stepTitle
    step() {
      if (this.step === 1) {
        this.stepTitle = "STEP1. 選擇付款方式";
      } else if (this.step === 2) {
        this.stepTitle = "STEP2. 填寫付款資訊";
      } else if (this.step === 3 && this.payment.name.indexOf("卡") == -1) {
        this.stepTitle = "您的訂單已成立！";
        this.payData.name = "";
      } else {
        this.stepTitle = "您的訂單已完成付款！";
        this.payData.name = "";
      }
    },
  },
  // computed大部分情況下只讀不寫
  computed: {
    // 因此剛好拿來讀取creditType，當符合input的第一個數字則回傳該信用卡樣式，並且跟html上綁定css樣式
    creditType() {
      if (this.creditNum.substring(0, 1) == 5) {
        return "master";
      } else if (this.creditNum.substring(0, 1) == 4) {
        return "visa";
      } else if (this.creditNum.substring(0, 1) == 3) {
        return "jcb";
      }
    },
  },
  methods: {
    //nextInput(num是input.value;key是要知道目前是底幾個input)
    nextInput(num, key) {
      console.log(num, num.length, key, key === 1);
      console.log(this.$refs, this.$refs.input1);
      if (key === 1 && num.length === 4) {
        this.$refs.input2.focus();
      } else if (key === 2 && num.length === 4) {
        this.$refs.input3.focus();
      } else if (key === 3 && num.length === 4) {
        this.$refs.input4.focus();
      }
    },
    // 選擇installment
    selectInstallments(item) {
      // step2:當點擊到class="installment"就把installment放入selectInstallment物件中(用展開淺層拷貝)
      this.selectInstallment = {
        ...item,
      };
    },
    // btn:下一步
    nextStep(item) {
      if (item.name) {
        this.step += 1;
      } else {
        console.log("請選擇付款方式");
      }
    },
    // 返回到第一頁
    firstStep() {
      this.payment = {};
      this.checkbox = false;
      this.step = 1;
    },
    // 確認付款
    finish() {
      this.step = 3;
      const year = new Date().getFullYear(); // 目前年份
      const month = new Date().getMonth() + 1; // 目前月份(getMonth:0~11，因此要+1才是12個月)
      const date = new Date().getDate() + 3; // 目前日期+3天
      const payDeadline = `${year}-${month}-${date} 23:59:59`;
      if (this.payment.name === "超商付款") {
        this.shopData[1].value = Math.random() // 取亂數(0.~~~)
          .toString(36) // 轉成36進位(0-9 + a-z)
          .toUpperCase() // 全部轉成大寫
          .substring(2); // 捨棄掉前２個字串
        this.shopData[2].value = payDeadline;
      } else {
        this.atmData[2].value = payDeadline;
      }
    },
    // 轉換checkbox&miniSideBar
    checked(key) {
      this[key] = !this[key];
      console.log("click checkbox");
    },
  },
};

Vue.createApp(app).mount("#app");
