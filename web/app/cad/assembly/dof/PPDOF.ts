import { Plane } from './../../../brep/geom/impl/plane';
import {AssemblyDOF, ModificationResponse} from "./assemblyDOF";
import Vector from "math/vector";
import {Matrix3, ORIGIN} from "math/l3space";
import {FaceTouchAlignConstraint} from "../constraints/faceTouchAlign";
import {eqTol} from "../../../brep/geom/tolerance";

export class PPDOF implements AssemblyDOF {


  translationPlane: Plane;
  rotationAxis: Vector;

  constructor(translationPlane: Plane, rotationAxis: Vector) {
    this.translationPlane = translationPlane;
    this.rotationAxis = rotationAxis;
  }


  applyTouchAlign(constr: FaceTouchAlignConstraint): AssemblyDOF {


    return this;
  }

  rotate(axis: Vector, angle: number, location: Matrix3, strict: boolean): ModificationResponse {
    return ModificationResponse.REJECTED;
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