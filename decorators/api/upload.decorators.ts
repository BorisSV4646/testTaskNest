import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

export function ApiUploadJsonFile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Upload a JSON file and process its contents',
      description:
        'Uploads a JSON file containing country data and processes it to save the countries in the database.',
    }),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'JSON file to upload',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'File uploaded and processed successfully',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({
      status: 400,
      description: 'Invalid file type or upload failed',
    }),
  );
}
