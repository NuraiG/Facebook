import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

const globalTheme = createMuiTheme({
  typography: {
    fontFamily: [
      "Segoe UI Historic",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#f0f2f5",
      },
      rounded: {
        borderRadius: "0",
      },
    },
  },
});

// light gray - white
const grayTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#f0f2f5",
      dark: "#f0f2f5",
    },
    secondary: {
      main: "#fff",
      dark: "#fff",
    },
  },
});

const grayThemeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#18191a",
      dark: "#18191a",
    },
    secondary: {
      main: "#242526",
      dark: "#242526",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#242526",
        color: "#e4e6eb",
      },
    },
  },
});

// darker gray + hover
const grayButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#050505", // buttons
      // dark: "#d8dadf",
      // contrastText: "#050505"
    },
    secondary: {
      main: "#606770", // icons
    },
  },
  overrides: {
    MuiIconButton: {
      colorPrimary: {
        backgroundColor: "#e4e6eb",
        "&:hover": {
          backgroundColor: "#d8dadf",
        },
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#e4e6eb",
        color: "#050505",
        "&:hover": {
          backgroundColor: "#d8dadf",
        },
      },
    }
  },
});

// blue - green
const blueGreenTheme = createMuiTheme({
  palette: {
    primary: {
      //blue
      main: "#1877f2",
      dark: "#166fe5",
      contrastText: "#ffffff",
    },
    secondary: {
      // green
      main: "#42b72a",
      dark: "#36a420",
      contrastText: "#ffffff",
    },
  },
});

// red - darker yellow
const redOrangeTheme = createMuiTheme({
  palette: {
    primary: {
      // red
      main: "#f02849",
      dark: "#e42645",
    },
    secondary: {
      // dark yellow
      main: "#f7b928",
      dark: "#eab026",
    },
  },
});

// blue-green buttons
const customButtonBlueGreen = createMuiTheme({
  palette: {
      primary: {
          main: '#1877f2',
          dark: '#1f65c0',
          contrastText: '#fff'
      },
      secondary: {
          main: '#42b72a',
          dark: '#3f932e',
          contrastText: '#fff'
      }
  }
});

export {
  globalTheme,
  grayTheme,
  grayThemeDark,
  grayButtonTheme,
  blueGreenTheme,
  redOrangeTheme,
  customButtonBlueGreen,
};
