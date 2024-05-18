import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { RegisterStudentsDto } from '../dtos';
import { StudentsService } from '../services/students.service';
import { Public, Roles } from 'src/libs/decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags ('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly StudentsService: StudentsService) {}


  @ApiBody({
    type: RegisterStudentsDto,
    description: 'Create students using RegisterStudentDto. ',
    examples: {
      example1:{
        value:{
          name: 'manuela',
          email: 'manuela@gmail.com',
          password: '1037669246',
          phone: '3115661125',
          document: '10376692456',
          dateBirth: '1999/06/20',
        }
      }
      
    }
  })
  @ApiOperation({ summary: 'Create a user to the system.', description: 'Create a user to access the system.' })
  @ApiResponse({status: 201, description: 'User created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the user is invalid.'})  
  @Public()
  @Roles('student')
  @Post('register')
  async register(@Body() registerDto: RegisterStudentsDto) {
    return this.StudentsService.create(registerDto);
  }

  @ApiParam({
    name:'email',
    type:'string',
    required: true,
    description: 'The email of the user to be found.',
    examples:{
      example1:{
        value:'manuela@gmail.com'
      }
    } 
  })
  @ApiOperation({ summary: 'Find the user by Email of the system.', description: 'View a specific user registered in the database.' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBearerAuth()
  @Roles('student')
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.StudentsService.findByEmail(email);
  }

  @ApiParam({
    name: '_id',
    type:'string',
    required: true,
    description: 'The ID of the user to be found.',
    examples:{
      example1:{
        value:'6644e72d9a4ff98eea5a2c75'
      }
    }
  })
  @ApiOperation({ summary: 'Find the user by ID of the system.', description: 'View a specific user registered in the database.' })
  @ApiResponse({status: 200, description: 'User found successfully.',})
  @ApiBearerAuth()
  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.StudentsService.findOne(_id);
  }

  @ApiParam({
    name: 'document',
    type:'string',
    required: true,
    description: 'Student document to delete.',
    examples:{
      example1:{
        value:'10376692456'
      }
    }
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user to the system.', description: 'Delete a user of the system.' })
  @ApiResponse({status: 200, description: 'User deleted successfully.'})
  @ApiResponse({status: 404, description: 'User with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the user.'})
  @Delete('delete/:document')
  removeStudentBydocument(@Param('document') document: string) {
    return this.StudentsService.removeStudentBydocument(document);
  }
}
