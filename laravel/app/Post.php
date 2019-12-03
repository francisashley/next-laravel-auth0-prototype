<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  protected $fillable = ['title', 'content', 'author', 'user_id'];

  public function user() {
        return $this->belongsTo('App\User', 'user_id', 'auth0_id');
    }
}
