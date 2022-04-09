// add useCache: boolean and cache: any to mongoose.Query.prototype
declare global {
  namespace Mongoose {
    interface Query<T> {
      useCache: boolean;
      cache: () => this;
    }
  }
}