import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { SubTask } from '../models/subTask.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  task = {} as Task
  subTask = {} as SubTask

  counterTask: any

  constructor(
    private firestore: AngularFirestore,
  ) 
  { 

  }

  ngOnInit() {

  }

  async resetCounter() {
    await this.firestore.doc('CounterTask/c1').update({
      value: 1
    })
  }

  async createTask(task: Task) {

    this.firestore.collection("CounterTask").snapshotChanges().subscribe(data => {
      this.counterTask = data.map(e => {
        return {
          id: e.payload.doc.id,
          value: e.payload.doc.data()['value']
        }
      })
    })
    
    task.uid = this.counterTask[0]['value']
    await this.firestore.collection('Tasks').add(task)
    console.log("Nova tarefa adicionada -> " ,task)
    
    task.uid++
    await this.firestore.doc('CounterTask/c1').update({
      value: task.uid
    })

  }

}
