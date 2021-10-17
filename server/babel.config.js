module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@entities': './src/entities',
        '@config': './src/configs',
        '@modules': './src/modules',
        '@database': './src/database',
        '@repository': './src/repositories',
        '@repository-impl': './src/repositories/prisma',
        '@repository-moke': './src/repositories/moke'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
