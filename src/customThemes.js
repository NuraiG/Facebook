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

// darker gray + hover
const grayButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#050505", // buttons
      // dark: "#d8dadf",
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

export {
  globalTheme,
  grayTheme,
  grayButtonTheme,
  blueGreenTheme,
  redOrangeTheme,
};
