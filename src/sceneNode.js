/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */

        // Get Transformation Matrix 
        var trsMatrix = this.trs.getTransformationMatrix();
        
        // Apply Transformation Matrix 
        var transformedMvp = MatrixMult(mvp, trsMatrix);
        var transformedModelView = MatrixMult(modelView, trsMatrix);
        var transformedNormals = MatrixMult(normalMatrix, trsMatrix);
        var transformedModel = MatrixMult(modelMatrix, trsMatrix);

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
        
        // Draw Children Nodes
        for (let idx = 0; idx < this.children.length; idx++) {
            this.children[idx].draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
}