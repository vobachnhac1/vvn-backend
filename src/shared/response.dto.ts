/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
export class ResponseObj {
  success = true;

  message?: string;

  data?: unknown;

  public static getSuccess(data: unknown = null): ResponseObj {
    const response = new ResponseObj();
    response.success = true;
    response.data = data;
    return response;
  }

  public static getFail(message: string = null): ResponseObj {
    const response = new ResponseObj();
    response.success = true;
    response.message = message;
    return response;
  }
}
