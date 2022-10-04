import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Class } from "./class.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ Class ]) ],
  controllers: [ ClassesController ],
  providers: [ ClassesService ],
  exports: [ TypeOrmModule ]
})
export class ClassesModule {
}
