module Blockchain
  class BlocksController < ApplicationController
    layout "blockchain"

    def show
      @block = Block.find(params[:id])
    end
  end
end