interface Constants {
  workflow: {
    edge: {
      sm: number;
      md: number;
    };
    node: {
      block: {
        w: number;
        h: {
          sm: number;
          md: number;
        };
      };
      add: {
        size: {
          w: number;
          h: number;
        };
      };
      label: {
        w: number;
        h: number;
      };
      create: {
        w: number;
        h: number;
      };
    };
    room: {
      x: number;
      y: number;
    };
    gaps: {
      next: number;
      into: number;
    };
  };
  flow: {
    config: {
      maxZoom: number;
      minZoom: number;
    };
  };
}

export const constants: Constants = {
  workflow: {
    edge: {
      sm: 32,
      md: 40,
    },
    node: {
      block: {
        w: 320,
        h: {
          sm: 42,
          md: 78,
        },
      },
      add: {
        size: {
          w: 32,
          h: 32,
        },
      },
      label: {
        w: 80,
        h: 32,
      },
      create: {
        w: 48,
        h: 42,
      },
    },
    room: {
      x: 32,
      y: 32,
    },
    gaps: {
      next: 40,
      into: 40,
    },
  },
  flow: {
    config: {
      maxZoom: 1,
      minZoom: 0.75,
    },
  },
};
