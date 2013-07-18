class Cocktail < ActiveRecord::Base
  attr_accessible :description, :instructions, :name, :ingredients_attributes
  has_many :ingredients
  belongs_to :user
  has_many :votes

  accepts_nested_attributes_for :ingredients 
end