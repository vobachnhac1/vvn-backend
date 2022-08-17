import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseObj } from 'src/shared';
import { GetCurrentUser } from '../login/decorators';
import {
  TaskFileDTO,
  TaskInfoDTO,
  TaskProcessDTO,
  TaskDTO,
  PriorityDTO,
  StepProcessDTO,
  ProcedureDTO,
} from './dto';
import { TaskService } from './task.service';

@ApiTags('Quản lý Task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách task theo userId',
  })
  async getTaskByFilter(
    @Body(ValidationPipe) data: TaskInfoDTO,
  ): Promise<ResponseObj> {
    return this.taskService.getTaskByFilter(data);
  }

  @Post('info')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Tạo danh sách task với UserId',
  })
  async createdTaskbyUser(
    @Body(ValidationPipe) data: TaskDTO,
  ): Promise<ResponseObj> {
    return this.taskService.createTask(data);
  }

  @Put('info')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'cập nhật task với taskId',
  })
  async updatedTaskbyUser(
    // @GetCurrentUser(ValidationPipe) data: TaskDTO): Promise<ResponseObj> {
    @Body(ValidationPipe) data: TaskDTO,
  ): Promise<ResponseObj> {
    return null;
  }

  @Get('priority')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách getListPriority',
  })
  async getListPriority(): Promise<ResponseObj> {
    return this.taskService.getListPriority(null);
  }

  @Post('priority')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách getListPriority',
  })
  async insertPriority(
    @Body(ValidationPipe) data: PriorityDTO,
  ): Promise<ResponseObj> {
    return this.taskService.insertPriority(data);
  }

  @Get('step-process')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách getListStepProcess',
  })
  async getListStepProcess(): Promise<ResponseObj> {
    return this.taskService.getListStepProcess(null);
  }

  @Post('step-process')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách getListStepProcess',
  })
  async insertStepProcess(
    @Body(ValidationPipe) data: StepProcessDTO,
  ): Promise<ResponseObj> {
    return this.taskService.insertStepProcess(data);
  }

  @Post('procedure')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Tạo một quy trình mới',
  })
  async insertProcedure(
    @Body(ValidationPipe) data: ProcedureDTO,
  ): Promise<ResponseObj> {
    return this.taskService.insertProcedure(data);
  }

  @Get('procedure')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Lấy danh sách quy trình',
  })
  async getListProcedure(): Promise<ResponseObj> {
    return this.taskService.getListProcedure(null);
  }

  @Get('procedure-detail/:procedure_id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Lấy danh sách quy trình chi tiết theo procedure_id',
  })
  async getListProcedureDetail(
    @Param('procedure_id') procedure_id: number,
  ): Promise<ResponseObj> {
    return this.taskService.getListProcedureDetail(procedure_id);
  }

  /// SUBMIT TASK
  @Post('submit-task')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Submit Task (Next Step)',
  })
  async SubmitTask(
    @Body(ValidationPipe) data: TaskProcessDTO,
  ): Promise<ResponseObj> {
    return this.taskService.submitTask(data);
  }
}
