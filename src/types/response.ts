export class ResponseStructure {
  success: boolean;
  data?: any;
  message?: any;
  constructor(success: boolean, data?: any, message?: any) {
    this.data=data;
    this.success=success;
    this.message=message;
  }
}
