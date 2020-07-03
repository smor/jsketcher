import {AssemblyConstraint, AssemblyConstraintSchema} from "../assemblyConstraint";
import {MObject} from "../../model/mobject";
import {NoIcon} from "../../../sketcher/icons/NoIcon";
import {AssemblyDOF} from "../dof/assemblyDOF";
import {MFace} from "../../model/mface";

export class FaceTouchAlignConstraint extends AssemblyConstraint {

  fixedFace: MFace;
  movingFace: MFace;

  constructor(schema: AssemblyConstraintSchema, fixedPart: MObject, movingPart: MObject, objects: MObject[]) {
    super(schema, fixedPart, movingPart, objects);
    this.movingFace = objects[0] as MFace;
    this.fixedFace = objects[1] as MFace;
  }

  apply(dof: AssemblyDOF) {
    dof.applyTouchAlign(this);
  }

}

export const FaceTouchAlign : AssemblyConstraintSchema = {

  id: 'FaceTouchAlign',
  name: 'Face Touch Align',
  icon: NoIcon,

  selectionMatcher: {
    selector: 'matchAll',
    types: ['face'],
    minQuantity: 2
  },

  implementation: FaceTouchAlignConstraint


};