class QueryUrl {
  private url = "";

  constructor(url: string) {
    this.url = url;
  }

  hasParams(): boolean {
    return this.url.includes("?");
  }

  addParam(key: string, value: string | number): QueryUrl {
    if (this.hasParams()) {
      this.url += `&`;
    } else {
      this.url += "?";
    }

    this.url += `${key}=${value}`;
    return this;
  }

  getString(): string {
    return this.url;
  }
}

export default QueryUrl;