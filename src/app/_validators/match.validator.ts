import {AbstractControl} from '@angular/forms';

export function LinesmanValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const linesman1 = control.get('Linesman1');
  const linesman2 = control.get('Linesman2');
  if (linesman1.pristine || linesman2.pristine) {
    return null;
  }
  return linesman1 && linesman2 && linesman1.value === linesman2.value ?
    { misMatch: true} : null;
}

export function TeamValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const Team1 = control.get('Team1Name');
  const Team2 = control.get('Team2Name');
  if (Team1.dirty || Team2.dirty) {
    return null;
  }
  return Team1 && Team2 && Team1.value === Team2.value ?
    { misMatch1: true} : null;
}
