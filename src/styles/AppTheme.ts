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
        disabled: string,
        underlay: string,
        underlayOpacity: number,
        overlay: string,
        overlayOpacity: number,
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
        disabled: "#a0a0a0",
        underlay: "#DDDDDD",
        underlayOpacity: 0.85,
        overlay: "#343434",
        overlayOpacity: 0.6,
    },
    fontSize: {
        small: 12,
        medium: 16,
        large: 25,
        title: 30,
    },
};

export default LightTheme;
