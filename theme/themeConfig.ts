import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#670316',
    colorPrimaryBg: "#fff",
    fontFamily: "'Open Sans', 'Open Sans Fallback'",
  },
  components: {
    Menu: {
      itemColor: "#3E444C",
      itemActiveBg: "rgba(254, 213, 0, 0.2)",
      itemSelectedBg: "#670316",
      itemSelectedColor: "#2E2E2E",
      itemMarginBlock: 2,
      activeBarHeight: 6,
      subMenuItemSelectedColor: "#670316"

    },
    Input: {
      controlHeightLG: 40,
      borderRadius: 5,
      controlHeight: 40,
    },
    InputNumber: {
      controlHeightLG: 40,
      borderRadius: 5,
      controlHeight: 40,
    },
    DatePicker: {
      controlHeightLG: 40,
      borderRadius: 5,
      controlHeight: 40,
    },
    Select: {
      // colorTextPlaceholder: "#6B6B6B",
      // colorBorder: "#C4C4C4",
      controlHeightLG: 40,
      controlHeight: 40,
      borderRadius: 5,
      // borderRadiusLG:5,
      // colorBgContainer: "#F5F5F5",
      // fontSizeLG: 14,
    },
    Form: {
      labelColor: "#191919",
      labelFontSize: 14,
    },
    Button: {
      borderRadius: 8,
      controlHeight: 58,
      defaultHoverBorderColor: "#0E0B0A",
      padding: 18,
      colorBorder:"#670316",
    },
    Upload:{
      fontSize:14
    },
    Tabs: {
      itemColor: "#373737",
      fontSize: 16,
      fontWeightStrong: 700,
      colorText: "#373737",
    },
    Pagination: {
      colorBgTextActive: "#f9f5ff",
      colorPrimary: "#670316",
      colorTextDisabled: "rgba(0, 0, 0, 0.25)",
      // : "#f9f5ff"
      // colorText: "#670316"
    }
  }
};
