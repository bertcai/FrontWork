import { Module, forwardRef } from '@nestjs/common';
import { CircularDependAModule } from 'src/circular-depend-a/circular-depend-a.module';

@Module({
  imports: [forwardRef(() => CircularDependAModule)],
})
export class CircularDependBModule {}
