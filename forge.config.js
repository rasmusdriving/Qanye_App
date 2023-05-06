/*module.exports = {
    packagerConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {
          name: 'Qanye',
        },
      },
      {
        name: '@electron-forge/maker-dmg',
        config: {
          name: 'Qanye',
        },
      },
      {
        name: '@electron-forge/maker-deb',
        config: {
          name: 'Qanye',
        },
      },
      {
        name: '@electron-forge/maker-rpm',
        config: {
          name: 'Qanye',
        },
      },
      {
        name: '@electron-forge/maker-appimage',
        config: {
          name: 'Qanye',
        },
      },
    ],
    publishers: [],
  };*/
  module.exports = {
    packagerConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-dmg',
        config: {
          name: 'Qanye',
        },
      },
    ],
    publishers: [],
  };
  