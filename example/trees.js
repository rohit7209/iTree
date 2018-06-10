var content = `
<div style="border:1px solid grey; border-radius:70px; width:10px; height:10px; overflow:hidden">
<img src="http://via.placeholder.com/300x111" style="width:100%; height:100%">
</div> 
`;

window.tree4 = {
  children: [
    {}, {},
    {
      children: [
        {},
        {
          children: [
            {}, {},
            {
              children: [
                {},
                {
                  children: [
                    {}, {}, {}, {}, {}
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

window.tree5 = {
  id1: {
    children: {
      id2: {},
      id3: {},
      id4: {
        children: [
          {},
          {
            children: [
              {}, {},
              {
                children: [
                  {},
                  {
                    children: [
                      {}, {}, {}, {}, {}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
};

window.tree1 = {
  content: {
    values: {
      name: 'rohit sharma',
      phone: '+91 7278518017',
      des: 'JS Developer',
      email: 'rohit@xyz.com',
      website: 'rohitsharma.xyz',
      address: 'Kolkata, INDIA',
      img: 'http://localhost:8080/example/img_avatar_her.png',
    }
  },
  children: [
    {
      content: {
        values: {
          name: 'my Name',
        }
      }
    },
    {
      children: [
        {
        },
        {
        },
      ]
    },
    {
    },
  ],
};



window.tree3 = {
  content: content,
  children: [
    {
      content: content,
      children: [
        {
          content: content,
          children: [
            {
              content: content,
              children: [
                {
                  content: content,
                  children: [],
                },
                {
                  content: content,
                  children: [],
                },
              ]
            },
            {
              content: content,
              children: [
                {
                  content: content,
                  children: [],
                },
                {
                  content: content,
                  children: [
                    {
                      content: content,
                      children: [
                        {
                          content: content,
                          children: [
                            {
                              content: content,
                              children: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ]
            }
          ]
        },
        {
          content: content,
          children: [
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [
                {
                  content: content,
                  children: [],
                },
              ],
            },
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [],
            },
          ],
        },
      ]
    },
    {
      content: content,
      children: [
        {
          content: content,
          children: [
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [
                {
                  content: content,
                  children: [
                    {
                      content: content,
                      children: [],
                    },
                    {
                      content: content,
                      children: [
                        {
                          content: content,
                          children: [],
                        },
                        {
                          content: content,
                          children: [
                            {
                              content: content,
                              children: [],
                            },
                            {
                              content: content,
                              children: [],
                            },],
                        },
                        {
                          content: content,
                          children: [],
                        },
                        {
                          content: content,
                          children: [],
                        },],
                    },],
                },],
            },
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [],
            },
            {
              content: content,
              children: [],
            },],
        },
        {
          content: content,
          children: [],
        },
      ]
    },
    {
      content: content,
      children: [
        {
          content: content,
          children: [
            {
              content: content,
              children: [
                {
                  content: content,
                  children: [
                    {
                      content: content,
                      children: [
                        {
                          content: content,
                          children: [],
                        },
                        {
                          content: content,
                          children: [],
                        },
                        {
                          content: content,
                          children: [
                            {
                              content: content,
                              children: [],
                            },
                            {
                              content: content,
                              children: [],
                            },],
                        },
                        {
                          content: content,
                          children: [],
                        },
                        {
                          content: content,
                          children: [],
                        },],
                    },],
                },],
            },],
        },
        {
          content: content,
          children: [{
            content: content,
            children: [
              {
                content: content,
                children: [],
              },
              {
                content: content,
                children: [],
              },
              {
                content: content,
                children: [],
              },],
          }],
        },
      ]
    },
  ],
};



window.tree2 = {
  name: 'root2',
  className: 'root',
  props: { width: '100px', height: '40px', background: 'red' },
  content: {},
  children: [
    {
      name: 'child1',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      content: content,
      children: [
        {
          name: 'child11',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: [
            {
              name: 'child1',
              className: 'children',
              style: { width: '80px', height: '35px', background: 'green' },
              content: content,
              children: [
                {
                  name: 'child11',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: [],
                },
                {
                  name: 'child12',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: [],
                },
              ]
            },
            {
              name: 'child1',
              className: 'children',
              style: { width: '80px', height: '35px', background: 'green' },
              content: content,
              children: [
                {
                  name: 'child11',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: [],
                },
                {
                  name: 'child12',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: [],
                },
              ]
            }
          ]
        },
        {
          name: 'child12',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: [],
        },
      ]
    },
    {
      name: 'child2',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      content: content,
      children: [
        {
          name: 'child21',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: [],
        },
        {
          name: 'child22',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: [],
        },
      ]
    },
    {
      name: 'child3',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      content: content,
      children: [
        {
          name: 'child31',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: [],
        },
        {
          name: 'child32',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: [{
            name: 'child31',
            className: 'children',
            style: { width: '80px', height: '35px', background: 'green' },
            content: content,
            children: [],
          }],
        },
      ]
    },
  ],
};