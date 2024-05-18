import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RegisterTeachersDto } from '../dtos';
import { TeachersService } from '../services/teachers.service';
import { Public, Roles } from 'src/libs/decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Teacher')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @ApiBody({
    type: RegisterTeachersDto,
    description: 'Create Teachers using RegisterStudentDto. ',
    examples: {
      example1:{
        value: {
          name: 'Rony',
          email: 'rony@gmail.com',
          password: '123456789',
          document: '123456789'
        }
      }
    }
  })
  @ApiOperation({ summary: 'Create a user to the system.', description: 'Create a user to access the system.' })
  @ApiResponse({status: 201, description: 'User created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the user is invalid.'}) 
  @Public()
  @Roles('teacher')
  @Post('register')
  async register(@Body() registerDto: RegisterTeachersDto) {
    return this.teachersService.create(registerDto);
  }

  @ApiParam({
    name:'email',
    type:'string',
    required: true,
    description: 'The email of the user to be found.',
    examples:{
      example1:{
        value:'rony@gmail.com'
      }
    } 
  })
  @ApiOperation({ summary: 'Find the user by Email of the system.', description: 'View a specific user registered in the database.' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBearerAuth()
  @Roles('teacher')
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.teachersService.findByEmail(email);
  }

  @ApiParam({
    name: '_id',
    type:'string',
    required: true,
    description: 'The ID of the user to be found.',
    examples:{
      example1:{
        value:'6644e72d9a4ff952425a5a55355'
      }
    }
  })
  @ApiOperation({ summary: 'Find the user by ID of the system.', description: 'View a specific user registered in the database.' })
  @ApiResponse({status: 200, description: 'User found successfully.',})
  @ApiBearerAuth()  
  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.teachersService.findOne(_id);
  }

  @ApiParam({
    name: 'document',
    type:'string',
    required: true,
    description: 'Teacher document to delete.',
    examples:{
      example1:{
        value:'1123456789'
      }
    }
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user to the system.', description: 'Delete a user of the system.' })
  @ApiResponse({status: 200, description: 'User deleted successfully.'})
  @ApiResponse({status: 404, description: 'User with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the user.'})
  @Delete('delete/:document')
  revomeTeacher(@Param('document') document:string) {
    return this.teachersService.revomeTeacher(document);
  }
}          
