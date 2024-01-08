import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, effect, signal } from '@angular/core';
import { of } from 'rxjs';
import { Student } from '../types/student.type';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  /**
   * The selected student
   * @example
   * const student = seletedStudent();
   */
  selectedStudent = signal<Student | null>(null, { equal: (a, b) => a?.id === b?.id });

  students = signal<Student[]>(this.getStudents());

  /**
   * Get all students from local storage
   * @returns
   * @example
   * const students = getStudents();
   */
  getStudents(): Student[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('students') || JSON.stringify(baseData));
    }
    return [];
  }

  /**
   * Add a new student to the list
   * @param student
   * @returns
   * @example
   * const student = { name: 'John', age: 20, id: 1 };
   * addStudent(student);
   */
  addStudent(student: Student) {
    student.id = this.getNewId();
    student.name.first = student.name.first[0].toUpperCase() + student.name.first.slice(1);
    student.name.last = student.name.last[0].toUpperCase() + student.name.last.slice(1);
    student.company.name = student.company.name[0].toUpperCase() + student.company.name.slice(1);
    student.email = student.email.toLowerCase();
    this.students().push(student);
    localStorage.setItem('students', JSON.stringify(this.students()));
    return of();
  }

  /**
   * Delete a student
   * @param student The student to delete
   * @example
   * const student = { name: 'John', age: 20, id: 1 };
   * deleteStudent(student);
   * @returns
   */
  deleteStudent(student: Student) {
    this.students.set(this.students().filter(s => s.id !== student.id));

    localStorage.setItem('students', JSON.stringify(this.students()));
    if (this.selectedStudent() && this.selectedStudent()?.id === student.id) {
      this.selectedStudent.set(null);
    }
  }

  private studentsIds = computed(() => this.students().map(s => s.id));

  /**
   * Get a new id for a student
   * takes the students Ids, remove them from an array of all possible ids (1 to 99) and return a random one
   */
  private getNewId(): number {
    const allIds = Array.from(Array(99).keys());
    const ids = allIds.filter(id => !this.studentsIds().includes(id));
    return ids[Math.floor(Math.random() * ids.length)];
  }
}

const baseData = [{ "id": 89, "name": { "first": "Leigha", "last": "Rogeron" }, "email": "lrogeron0@nps.gov", "phone": "0625338575", "company": { "website": "prweb.com", "name": "Centidel" }, "picture": "MaurisUllamcorperPurus.tiff", "sexe": "F" },
{ "id": 46, "name": { "first": "Toni", "last": "Blennerhassett" }, "email": "tblennerhassett1@gnu.org", "phone": "0688140081", "company": { "website": "4shared.com", "name": "Wikizz" }, "picture": "EuTincidunt.doc", "sexe": "F" },
{ "id": 78, "name": { "first": "Eleonore", "last": "Marlow" }, "email": "emarlow2@independent.co.uk", "phone": "0632639280", "company": { "website": "google.fr", "name": "Ntags" }, "picture": "DolorQuis.png", "sexe": "F" },
{ "id": 6, "name": { "first": "Fredericka", "last": "Gaze" }, "email": "fgaze3@paypal.com", "phone": "0665918497", "company": { "website": "themeforest.net", "name": "Demivee" }, "picture": "TellusIn.gif", "sexe": "F" },
{ "id": 66, "name": { "first": "Hillard", "last": "Poxon" }, "email": "hpoxon4@accuweather.com", "phone": "0665103157", "company": { "website": "webmd.com", "name": "Twimm" }, "picture": "TortorId.mpeg", "sexe": "H" },
{ "id": 26, "name": { "first": "Philip", "last": "Cabrales" }, "email": "pcabrales5@desdev.cn", "phone": "0639032612", "company": { "website": "hubpages.com", "name": "Quimba" }, "picture": "Donec.gif", "sexe": "H" },
{ "id": 22, "name": { "first": "Jan", "last": "Ludlow" }, "email": "jludlow6@amazon.com", "phone": "0632965631", "company": { "website": "spiegel.de", "name": "Zooxo" }, "picture": "IntegerAc.xls", "sexe": "F" },
{ "id": 47, "name": { "first": "Valeda", "last": "Turneux" }, "email": "vturneux7@nasa.gov", "phone": "0633442383", "company": { "website": "uiuc.edu", "name": "Reallinks" }, "picture": "Dapibus.mp3", "sexe": "F" },
{ "id": 34, "name": { "first": "Di", "last": "Allberry" }, "email": "dallberry8@tinypic.com", "phone": "0627703749", "company": { "website": "oracle.com", "name": "Dazzlesphere" }, "picture": "SemperInterdum.jpeg", "sexe": "F" },
{ "id": 16, "name": { "first": "Clevey", "last": "Warrillow" }, "email": "cwarrillow9@samsung.com", "phone": "0616208021", "company": { "website": "reddit.com", "name": "Dynava" }, "picture": "Rutrum.tiff", "sexe": "H" },
{ "id": 72, "name": { "first": "Archambault", "last": "Winfield" }, "email": "awinfielda@accuweather.com", "phone": "0654706267", "company": { "website": "chron.com", "name": "Miboo" }, "picture": "Laoreet.avi", "sexe": "H" },
{ "id": 19, "name": { "first": "Cheslie", "last": "Chastang" }, "email": "cchastangb@ow.ly", "phone": "0634821119", "company": { "website": "ted.com", "name": "Gevee" }, "picture": "Suspendisse.png", "sexe": "F" },
{ "id": 73, "name": { "first": "Lianne", "last": "Bleckly" }, "email": "lblecklyc@t.co", "phone": "0612484683", "company": { "website": "163.com", "name": "Rhycero" }, "picture": "Metus.mp3", "sexe": "F" },
{ "id": 23, "name": { "first": "Jonell", "last": "Chard" }, "email": "jchardd@elegantthemes.com", "phone": "0669296258", "company": { "website": "utexas.edu", "name": "Topicblab" }, "picture": "Vel.doc", "sexe": "F" },
{ "id": 55, "name": { "first": "Heloise", "last": "Jimmison" }, "email": "hjimmisone@wp.com", "phone": "0641925990", "company": { "website": "flickr.com", "name": "Tazzy" }, "picture": "Mi.png", "sexe": "F" },
{ "id": 65, "name": { "first": "Estrellita", "last": "Verheyden" }, "email": "everheydenf@booking.com", "phone": "0611080420", "company": { "website": "acquirethisname.com", "name": "Voonyx" }, "picture": "LaciniaEget.pdf", "sexe": "F" },
{ "id": 54, "name": { "first": "Riane", "last": "Voak" }, "email": "rvoakg@google.co.uk", "phone": "0640205789", "company": { "website": "examiner.com", "name": "Vinte" }, "picture": "SitAmetDiam.jpeg", "sexe": "F" },
{ "id": 73, "name": { "first": "Verine", "last": "Markovic" }, "email": "vmarkovich@columbia.edu", "phone": "0655743799", "company": { "website": "icio.us", "name": "Yodo" }, "picture": "PretiumQuis.xls", "sexe": "F" },
{ "id": 62, "name": { "first": "Marianna", "last": "Ansteys" }, "email": "mansteysi@ucoz.com", "phone": "0649726257", "company": { "website": "163.com", "name": "Browsebug" }, "picture": "Purus.pdf", "sexe": "F" },
{ "id": 12, "name": { "first": "Di", "last": "Tellesson" }, "email": "dtellessonj@rakuten.co.jp", "phone": "0654453602", "company": { "website": "mapy.cz", "name": "Zoombox" }, "picture": "NonMauris.avi", "sexe": "F" },
{ "id": 44, "name": { "first": "Jocko", "last": "Alliker" }, "email": "jallikerk@icq.com", "phone": "0660531151", "company": { "website": "amazon.co.uk", "name": "Agimba" }, "picture": "LoremInteger.avi", "sexe": "H" },
{ "id": 22, "name": { "first": "Lucretia", "last": "Hardwidge" }, "email": "lhardwidgel@cbc.ca", "phone": "0679145070", "company": { "website": "walmart.com", "name": "Twimbo" }, "picture": "VelEnim.ppt", "sexe": "F" },
{ "id": 75, "name": { "first": "Lorine", "last": "Daile" }, "email": "ldailem@pbs.org", "phone": "0621313996", "company": { "website": "nih.gov", "name": "Avamba" }, "picture": "AtTurpis.ppt", "sexe": "F" },
{ "id": 44, "name": { "first": "Coral", "last": "Pittem" }, "email": "cpittemn@intel.com", "phone": "0606256054", "company": { "website": "canalblog.com", "name": "Photofeed" }, "picture": "Cras.mp3", "sexe": "F" },
{ "id": 56, "name": { "first": "Saunderson", "last": "Stuttard" }, "email": "sstuttardo@youtube.com", "phone": "0602695740", "company": { "website": "wisc.edu", "name": "Skaboo" }, "picture": "HendreritAt.jpeg", "sexe": "H" },
{ "id": 68, "name": { "first": "Delinda", "last": "Jansens" }, "email": "djansensp@gravatar.com", "phone": "0680664211", "company": { "website": "free.fr", "name": "Camimbo" }, "picture": "Cras.txt", "sexe": "F" },
{ "id": 58, "name": { "first": "Hedi", "last": "Terbeck" }, "email": "hterbeckq@scientificamerican.com", "phone": "0619991892", "company": { "website": "gov.uk", "name": "Meemm" }, "picture": "QuisqueArcuLibero.ppt", "sexe": "F" },
{ "id": 74, "name": { "first": "Haily", "last": "Laval" }, "email": "hlavalr@fema.gov", "phone": "0604991259", "company": { "website": "mac.com", "name": "Realfire" }, "picture": "Aenean.ppt", "sexe": "F" },
{ "id": 4, "name": { "first": "Anselma", "last": "Blaes" }, "email": "ablaess@chron.com", "phone": "0656575044", "company": { "website": "theglobeandmail.com", "name": "Photobug" }, "picture": "NisiNamUltrices.avi", "sexe": "F" },
{ "id": 40, "name": { "first": "Beverie", "last": "Bastard" }, "email": "bbastardt@bing.com", "phone": "0625671470", "company": { "website": "apache.org", "name": "Eayo" }, "picture": "InterdumVenenatisTurpis.xls", "sexe": "F" }];