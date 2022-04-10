declare module "mongoose" {
  interface DocumentQuery<
    T,
    DocType extends mongoose.Document,
    QueryHelpers = {}
  > {
    mongooseCollection: { name: any };
    cache(
      options: { key?: string } = {}
    ): DocumentQuery<T[], Document> & QueryHelpers;
    useCache: boolean;
    hashKey: string;
  }

  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
    extends DocumentQuery<any, any> {}
}
