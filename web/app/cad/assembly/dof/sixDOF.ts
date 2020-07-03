import {AssemblyDOF, ModificationResponse} from "./assemblyDOF";
import Vector from "math/vector";
import {Matrix3, ORIGIN} from "math/l3space";
import {FaceTouchAlignConstraint} from "../constraints/faceTouchAlign";
import {PPDOF} from "./PPDOF";

export class SixDOF implements AssemblyDOF {

  applyTouchAlign(constr: FaceTouchAlignConstraint): AssemblyDOF {

    const vecA = constr.movingFace.normal();
    const vecB = constr.fixedFace.root.location._applyNoTranslation(constr.fixedFace.normal()).negate();

    const location = constr.movingPart.root.location;

    Matrix3.rotationFromVectorToVector(vecA, vecB, ORIGIN, location);

    const ptFixed = constr.fixedFace.root.location.apply(constr.fixedFace.csys.origin);
    const ptMoving = constr.movingFace.root.location.apply(constr.movingFace.csys.origin);

    const dir = ptFixed._minus(ptMoving);

    location.translate(dir.x, dir.y, dir.z);

    return new PPDOF();
  }

  rotate(axis: Vector, angle: number, location: Matrix3, strict: boolean): ModificationResponse {
    return ModificationResponse.REJECTED;
  }

  translate(dir: Vector, location: Matrix3, strict: boolean): ModificationResponse {
    return ModificationResponse.REJECTED;
  }

}