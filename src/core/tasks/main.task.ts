import * as gulp from 'gulp';
import { DeleteDestFolderTask } from './delete-dest-folder.task';
import { InlineHtmlCssTask } from './inline-html-css.task';
import { NgcCompileTask } from './ngc-compile.task';
import { CopyTsconfigNgcTask } from './copy-tsconfig-ngc.task';

/**
 * Main taks that manages all dependencies between other tasks
 */
export class MainTask {
  private deleteTask: DeleteDestFolderTask;
  private inlineTask: InlineHtmlCssTask;
  private copyTsconfigTask: CopyTsconfigNgcTask;
  private ngcTask: NgcCompileTask;

  constructor() {
    this.deleteTask = new DeleteDestFolderTask();
    this.inlineTask = new InlineHtmlCssTask();
    this.copyTsconfigTask = new CopyTsconfigNgcTask();
    this.ngcTask = new NgcCompileTask();
  }

  registerAllTasks(argv: any) {
    const deleteTaskName = this.deleteTask.registerTask(argv);
    const inlineTaskName = this.inlineTask.registerTask(argv, [deleteTaskName]);
    const copyTsconfigTaskName = this.copyTsconfigTask.registerTask(argv, [inlineTaskName]);
    const ngcTaskName = this.ngcTask.registerTask(argv, [copyTsconfigTaskName]);
    const taskName = 'main-task';

    gulp.task(taskName, [ngcTaskName]);

    return taskName;
  }
}
