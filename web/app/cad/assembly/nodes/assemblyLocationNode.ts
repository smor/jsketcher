import {Param} from "../../../sketcher/shapes/param";
import {Matrix3} from "math/l3space";
import {MObject} from "../../model/mobject";
import {AlgNumConstraint} from "../../../sketcher/constr/ANConstraints";
import {Constraints3D} from "../constraints3d";
import {AssemblyNode} from "../assembly";
import Vector from "math/vector";

export class AssemblyLocationNode extends AssemblyNode {

  ix = new Param(1, 'X');
  iy = new Param(0, 'Y');
  iz = new Param(0, 'Z');
  jx = new Param(0, 'X');
  jy = new Param(1, 'Y');
  jz = new Param(0, 'Z');
  kx = new Param(0, 'X');
  ky = new Param(0, 'Y');
  kz = new Param(1, 'Z');

  dx = new Param(0, 'X');
  dy  = new Param(0, 'Y');
  dz  = new Param(0, 'Z');

  constructor(model: MObject) {
    super(model);
  }

  visitParams(cb) {
    cb(this.ix);
    cb(this.iy);
    cb(this.iz);
    cb(this.jx);
    cb(this.jy);
    cb(this.jz);
    cb(this.kx);
    cb(this.ky);
    cb(this.kz);
  }

  reset() {
    this.ix.set(1);
    this.iy.set(0);
    this.iz.set(0);
    this.jx.set(0);
    this.jy.set(1);
    this.jz.set(0);
    this.kx.set(0);
    this.ky.set(0);
    this.kz.set(1);
    this.dx.set(0);
    this.dy.set(0);
    this.dz.set(0);
  }


  rotationMatrix() {

    return new Matrix3().set3(

      ...this.rotationComponents()

    );

  }

  rotationComponents(): [number, number, number, number, number, number, number, number, number] {
    const {
      ix, iy, iz, jx, jy, jz, kx, ky, kz
    } = this;

    return [
      ix.get(), iy.get(), iz.get(),
      jx.get(), jy.get(), jz.get(),
      kx.get(), ky.get(), kz.get()
    ];
  }

  setRotationMatrix(mx: Matrix3) {
    const {
      mxx, mxy, mxz,
      myx, myy, myz,
      mzx, mzy, mzz
    } = mx;
    this.ix.set(mxx); this.jx.set(mxy); this.kx.set(mxz);
    this.iy.set(myx); this.jy.set(myy); this.ky.set(myz);
    this.iz.set(mzx); this.jz.set(mzy); this.kz.set(mzz);
  }

  translationComponents(): [number, number, number] {
    return [this.dx.get(), this.dy.get(), this.dz.get()];
  }

  toMatrix() {
    const mx = this.rotationMatrix();
    mx.setTranslation(...this.translationComponents());
    return mx;
  }

  createConsistencyConstraints() {
    return [
      // new AlgNumConstraint(Constraints3D.CSysConsistency, [this])
    ];
  }

}