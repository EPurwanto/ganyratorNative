export interface Theme {
    dark: boolean,
    colors: {
        background: string,
        card: string,
        border: string,
        text: string,
        notification: string,
        primary: string,
        success: string,
        danger: string,
        highlightUnderlay: string,
    },
    fontSize: {
        small: number,
        medium: number,
        large: number,
        title: number,
    },
}

const LightTheme: Theme = {
    dark: false,
    colors: {
        background: "#ebfcd6",
        card: "#b3e99f",
        border: "#7DAA7B",
        text: "#374c0f",
        notification: "#7ED957",
        primary: "#3d82ff",
        success: "#28d200",
        danger: "#cb2005",
        highlightUnderlay: "#DDDDDD",
    },
    fontSize: {
        small: 12,
        medium: 16,
        large: 25,
        title: 30,
    },
};

export default LightTheme;
