import {RotationConstraint} from "./constraints3d";
import {AssemblyLocationNode} from "./nodes/assemblyLocationNode";
import {Matrix3, ORIGIN} from "math/l3space";
import Vector from "math/vector";

export interface RotationState {

  applyConstraint(constr: RotationConstraint, location: Matrix3): RotationState;

}

export class RotationState3DOF implements RotationState {

  constructor() {

  }

  applyConstraint(constr: RotationConstraint, location: Matrix3): RotationState1DOF {

    const {vecA, vecB} = constr;

    Matrix3.rotationFromVectorToVector(vecA, vecB, ORIGIN, location);

    return new RotationState1DOF(vecB);
  }

}

export class RotationState1DOF implements RotationState {

  rotationAxis: Vector;

  constructor(rotationAxis: Vector) {
    this.rotationAxis = rotationAxis;
  }

  applyConstraint(constr: RotationConstraint, location: Matrix3): RotationState0DOF {

    return new RotationState0DOF();
  }

}

export class RotationState0DOF implements RotationState {

  constructor() {

  }

  applyConstraint(constr: RotationConstraint, location: Matrix3): RotationState0DOF {

    return new RotationState0DOF();
  }

}