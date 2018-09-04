declare module 'bd-dist'

declare type Options = {
  index?: string,
}

declare function main(root: string, route?: string, opts?: Options): Promise<void>

export default main
