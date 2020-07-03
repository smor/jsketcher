import {Matrix3} from "math/l3space";
import Vector from "math/vector";
import {Plane} from "../../brep/geom/impl/plane";
import {Line} from "../../brep/geom/impl/line";
import {eqTol} from "../../brep/geom/tolerance";

export enum ModificationResponse {

  SUCCESS, FIXED, REJECTED

}

export interface TranslationState {

  applyConstraint(constr: Vector, location: Matrix3): TranslationState;

  translate(dir: Vector, location: Matrix3, strict: boolean): ModificationResponse;

}

export class TranslationState3DOF implements TranslationState {

  constructor() {

  }

  applyConstraint(constr: Vector, location: Matrix3): TranslationState2DOF {

    location.setTranslation(constr.x, constr.y, constr.z);

    return new TranslationState2DOF(null);
  }

  translate(dir: Vector, location: Matrix3, strict: boolean): ModificationResponse {
    location.translate(dir.x, dir.y, dir.z);
    return ModificationResponse.SUCCESS;
  }
}

export class TranslationState2DOF implements TranslationState {

  translationPlane: Plane;

  constructor(translationPlane: Plane) {
    this.translationPlane = translationPlane;
  }

  applyConstraint(constr: Vector, location: Matrix3): TranslationState1DOF {

    return new TranslationState1DOF(null);
  }

  translate(dir: Vector, location: Matrix3, strict: boolean): ModificationResponse {

    const normal = this.translationPlane.normal;
    const illegalTranslation = !eqTol(normal.dot(dir), 0);
    if (illegalTranslation && strict) {
      return ModificationResponse.REJECTED;
    }

    //fix it anyway to mitigate any rounding errors

    debugger;

    const y = normal.cross(dir)._normalize();
    const x = y.cross(normal)._normalize();

    const u = x.dot(dir);
    const fixedDir = x._multiply(u);

    location.translateVec(fixedDir);

    return illegalTranslation ? ModificationResponse.FIXED : ModificationResponse.SUCCESS;
  }

}

export class TranslationState1DOF implements TranslationState {

  translationLine: Line;

  constructor(translationLine: Line) {
    this.translationLine = translationLine;
  }

  applyConstraint(constr: Vector, location: Matrix3): TranslationState0DOF {

    return new TranslationState0DOF();
  }

  translate(dir: Vector, location: Matrix3, strict: boolean): ModificationResponse {
    return ModificationResponse.REJECTED;
  }

}


export class TranslationState0DOF implements TranslationState {

  constructor() {

  }

  applyConstraint(constr: Vector, location: Matrix3): TranslationState0DOF {

    return new TranslationState0DOF();
  }

  translate(dir: Vector, location: Matrix3, strict: boolean): ModificationResponse {
    return ModificationResponse.REJECTED;
  }

}