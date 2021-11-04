import { Schema } from 'express-validator'
interface ICreatePointResquestDTO {
  name: string;
  email: string;
  description: string;
  whatsapp: string;
  fone: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  address: string;
  district: string;
  number: number;
  image: string;
  cep: string;
  itensIds: number[];
}

const createPoitRequestBodyValidator = {
  name: {
    errorMessage: 'name required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  email: {
    errorMessage: 'email required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    },
    isEmail: {
      errorMessage: 'email format e-mail',
      bail: true
    }
  },
  description: {
    errorMessage: 'description required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  whatsapp: {
    errorMessage: 'whatsapp required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    },
    isInt: {
      errorMessage: 'whatsapp only numbers',
      bail: true
    },
    isLength: {
      errorMessage: 'whatsapp in between 10 and 11 numbers',
      options: {
        min: 10,
        max: 11
      },
      bail: true
    }
  },
  fone: {
    errorMessage: 'fone required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    },
    isInt: {
      errorMessage: 'fone only numbers',
      bail: true
    },
    isLength: {
      errorMessage: 'fone in between 10 and 11 numbers',
      options: {
        min: 10,
        max: 11
      },
      bail: true
    }
  },
  latitude: {
    errorMessage: 'latitude required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  longitude: {
    errorMessage: 'longitude required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  city: {
    errorMessage: 'ctiy required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  uf: {
    errorMessage: 'uf required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  address: {
    errorMessage: 'address required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  district: {
    errorMessage: 'district required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  number: {
    errorMessage: 'number required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    },
    isInt: {
      errorMessage: 'number is number',
      bail: true
    }
  },
  image: {
    errorMessage: 'image required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    }
  },
  cep: {
    errorMessage: 'cep required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    },
    isInt: {
      errorMessage: 'cep only numbers',
      bail: true
    },
    isLength: {
      errorMessage: 'cep is 8 numbers',
      options: {
        min: 8,
        max: 8
      },
      bail: true
    }
  },
  itensIds: {
    errorMessage: 'itensIds required',
    exists: {
      bail: true
    },
    notEmpty: {
      bail: true,
      options: {
        ignore_whitespace: true
      }
    },
    isArray: {
      errorMessage: 'itensIds is array',
      bail: true
    }
  }
} as Schema

export { ICreatePointResquestDTO, createPoitRequestBodyValidator }
