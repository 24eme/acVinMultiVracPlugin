<?php
/**
 * BaseVracCouleur
 * 
 * Base model for VracCouleur

 * @property string $libelle
 * @property string $libelle_long

 * @method string getLibelle()
 * @method string setLibelle()
 * @method string getLibelleLong()
 * @method string setLibelleLong()
 
 */

abstract class BaseVracCouleur extends _VracNoeud {
                
    public function configureTree() {
       $this->_root_class_name = 'Vrac';
       $this->_tree_class_name = 'VracCouleur';
    }
                
}