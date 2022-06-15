import { ApiProperty } from "@nestjs/swagger";

export class PagePartition {
  @ApiProperty({ default: 0, description: 'Tổng số data' })
  total_item: number;

  @ApiProperty({ default: 0, description: 'Tổng số trang' })
  total_index: number;

  @ApiProperty({ default: 0, description: 'Trang số' })
  page_index: number;

  @ApiProperty({ default: 0, description: 'Số data trong 1 trang' })
  item_page_index: number;

}