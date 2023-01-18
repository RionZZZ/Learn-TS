declare namespace responseResult {
  interface DataStructure {
    [key: string]: CourseItem[];
  }

  interface CourseItem {
    title: string;
    count: number;
  }

  type isLogin = boolean;
  type login = boolean;
  type logout = boolean;
  type getData = boolean;
  type showData = DataStructure | boolean;
}
