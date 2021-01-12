interface iMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'mathiasnikkel@gmail.com',
      name: 'Mathias Nikkel',
    },
  },
} as iMailConfig;
