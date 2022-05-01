export const data = [
  {
    type: "dir",
    name: "Games",
    collapsed: false,
    children: [
      {
        type: "dir",
        name: "MultiPlayer",
        collapsed: true,
        children: [
          {
            type: "file",
            name: "CS:GO",
          },
          {
            type: "file",
            name: "PUBG",
          },
        ],
      },
      {
        type: "dir",
        name: "SinglePlayer",
        collapsed: true,
        children: [
          {
            type: "file",
            name: "Need For Speed",
          },
          {
            type: "file",
            name: "The Last of Us",
          },
        ],
      },
    ],
  },
  {
    type: "dir",
    name: "Movies",
    collapsed: false,
    children: [
      {
        type: "dir",
        name: "Hollywood",
        collapsed: false,
        children: [
          {
            type: "dir",
            name: "Sci-Fi",
            collapsed: false,
            children: [
              {
                type: "file",
                name: "Inception",
              },
              {
                type: "file",
                name: "Interstellar",
              },
            ],
          },
          {
            type: "dir",
            name: "Action",
            collapsed: false,
            children: [
              {
                type: "file",
                name: "John Wick",
              },
              {
                type: "file",
                name: "Terminator",
              },
            ],
          },
        ],
      },
    ],
  },
];
