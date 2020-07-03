import {Param} from "../../../sketcher/shapes/param";
import Vector from "math/vector";
import {MObject} from "../../model/mobject";
import {AlgNumConstraint} from "../../../sketcher/constr/ANConstraints";
import {Constraints3D} from "../constraints3d";
import {AssemblyNode} from "../assembly";
import {AssemblyLocationNode} from "./assemblyLocationNode";

export class AssemblyPlaneNode extends AssemblyNode {

  x = new Param(0, 'X');
  y = new Param(0, 'Y');
  z = new Param(0, 'Z');
  w = new Param(0, 'W');
  getNormal: () => Vector;
  getDepth: () => number;

  constructor(model: MObject, getNormal: () => Vector, getDepth: () => number) {
    super(model);
    this.getNormal = getNormal;
    this.getDepth = getDepth;
  }

  visitParams(cb) {
    cb(this.x);
    cb(this.y);
    cb(this.z);
    cb(this.w);
  }

  reset() {
    const {x, y, z} = this.getNormal();
    const w = this.getDepth();
    this.x.set(x);
    this.y.set(y);
    this.z.set(z);
    this.w.set(w);
  }

  toNormalVector() {
    return new Vector(
      this.x.get(),
      this.y.get(),
      this.z.get(),
    )
  }

  createConsistencyConstraints() {
    return [

    ];
  }


  // createOrientationRelationship(location: AssemblyLocationNode): AlgNumConstraint[] {
    // return [new AlgNumConstraint(Constraints3D.PlaneNormalLink, [location, this])];
  // }

  createTranslationRelationship(location: AssemblyLocationNode): AlgNumConstraint[] {
    return [new AlgNumConstraint(Constraints3D.PlaneDepthLink, [location, this])];
  }

}