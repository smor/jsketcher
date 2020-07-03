import {AssemblyDOF} from "./assemblyDOF";
import Vector from "math/vector";
import {Matrix3, ORIGIN} from "math/l3space";
import {FaceTouchAlignConstraint} from "../constraints/faceTouchAlign";
import {ModificationResponse} from "../translationState";

export class SixDOF implements AssemblyDOF {

  applyTouchAlign(constr: FaceTouchAlignConstraint): AssemblyDOF {

    const vecA = constr.movingFace.normal();

    const vecB = constr.fixedFace.root.location._applyNoTranslation(constr.fixedFace.normal()).negate();

    Matrix3.rotationFromVectorToVector(vecA, vecB, ORIGIN, constr.movingPart.root.location);

    return this;
  }

  rotate(axis: Vector, angle: number, location: Matrix3, strict: boolean): ModificationResponse {
    return ModificationResponse.REJECTED;
  }

  translate(dir: Vector, location: Matrix3, strict: boolean): ModificationResponse {
    return ModificationResponse.REJECTED;
  }

}