const themes = {
  light: {
    bgColor: "#ccc",
    joke: {
      text: "#222"
    }
  },
  dark: {
    bgColor: "#222",
    joke: {
      text: "#fff"
    }
  }
};

export default {
  name: "light"
};

export function getTheme() {
  return ({ get }) => {
    const currentTheme = get("theme").name;
    return {
      name: currentTheme,
      ...themes[currentTheme]
    };
  };
}

export function setTheme(name) {
  return store => {
    store.set("theme", { name });
  };
}
