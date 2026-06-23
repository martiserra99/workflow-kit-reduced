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
    drop: number; // The maximum distance a dragged node can be from a drop area node to be considered inside it.
  };
  flows: {
    config: {
      maxZoom: number;
      minZoom: number;
    };
    center: {
      zoom: number; // Zoom level to apply when centering on a node.
      duration: number; // Animation duration for centering the viewport on a node.
    };
    controls: {
      zoom: {
        duration: number;
      };
      fitView: {
        duration: number;
      };
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
    drop: 160,
  },
  flows: {
    config: {
      maxZoom: 1,
      minZoom: 0.75,
    },
    center: {
      zoom: 1,
      duration: 1000,
    },
    controls: {
      zoom: {
        duration: 500,
      },
      fitView: {
        duration: 1000,
      },
    },
  },
};
