import { Module, forwardRef } from '@nestjs/common';
import { CircularDependBModule } from 'src/circular-depend-b/circular-depend-b.module';

@Module({
  imports: [forwardRef(() => CircularDependBModule)],
})
export class CircularDependAModule {}
